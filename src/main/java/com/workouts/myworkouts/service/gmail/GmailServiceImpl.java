package com.workouts.myworkouts.service.gmail;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.google.api.services.gmail.model.ListMessagesResponse;
import com.google.api.services.gmail.model.Message;
import com.google.api.services.gmail.model.MessagePart;
import com.google.api.services.gmail.model.MessagePartBody;
import com.google.common.collect.Lists;
import com.workouts.myworkouts.model.entity.weight.TanitaLastUpdate;
import com.workouts.myworkouts.repository.weight.TanitaLastUpdateRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service(value = "gmailService")
public class GmailServiceImpl implements GmailService {

    private static final String APPLICATION_NAME = "My Center";

    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    private static final String USER = "me";

    private static final List<String> SCOPES = Lists.newArrayList(
            GmailScopes.GMAIL_READONLY,
            GmailScopes.GMAIL_MODIFY,
            GmailScopes.MAIL_GOOGLE_COM);

    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    private static final String QUERY = "from:apps@tanita.eu";

    private final TanitaLastUpdateRepository tanitaLastUpdateRepository;

    @Override
    public byte[] getAttachmentFromMailByQuery() throws IOException, GeneralSecurityException {
        return listMessagesMatchingQuery(getGmailService());
    }

    @Override
    public boolean doesNewTanitaEmailExist() throws IOException, GeneralSecurityException {
        final TanitaLastUpdate weightLastUpdate = tanitaLastUpdateRepository.findTopByOrderByIdDesc()
                .orElseGet(() -> TanitaLastUpdate.builder()
                        .updated(LocalDateTime.now())
                        .build());
        final String query = QUERY +
                " after:" +
                weightLastUpdate.getUpdated().format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT));

        log.debug("Checking if there is a new email from tanita with query {}...", query);

        final ListMessagesResponse response = getGmailService()
                .users()
                .messages()
                .list(USER)
                .setMaxResults(1L)
                .setQ(query)
                .execute();

        final List<Message> foundMessages = response.getMessages();
        if (foundMessages == null) {
            log.debug("No new messages found.");
            return false;
        } else {
            log.debug("Found {} messages", foundMessages.size());
            return true;
        }
    }

    private Gmail getGmailService() throws IOException, GeneralSecurityException {
        // Build a new authorized API client service.
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        return new Gmail.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private byte[] listMessagesMatchingQuery(Gmail service) throws IOException {
        log.debug("Getting messages from gmail with query {}", GmailServiceImpl.QUERY);

        final ListMessagesResponse response = service.users()
                .messages()
                .list(GmailServiceImpl.USER)
                .setMaxResults(1L)
                .setQ(GmailServiceImpl.QUERY)
                .execute();
        final List<Message> messages = response.getMessages();

        if (response.getMessages() == null || response.getMessages().isEmpty()) {
            return new byte[0];
        }

        log.debug("Got {} messages from gmail: {}", messages.size(), messages);

        return getAttachments(service, response.getMessages().getFirst().getId());
    }

    /**
     * Get the attachments in a given email.
     *
     * @param service   Authorized Gmail API instance.
     * @param messageId ID of Message containing attachment.
     * @throws IOException when it failes to read email attachment
     */
    private byte[] getAttachments(Gmail service, String messageId) throws IOException {
        final Message message = service.users().messages().get(GmailServiceImpl.USER, messageId).execute();
        final List<MessagePart> parts = message.getPayload().getParts();
        for (MessagePart part : parts) {
            if (part.getFilename() != null && !part.getFilename().isEmpty()) {
                String filename = part.getFilename();
                String attId = part.getBody().getAttachmentId();
                MessagePartBody attachPart = service.users().messages().attachments().
                        get(GmailServiceImpl.USER, messageId, attId).execute();

                log.debug("Saving attachment with name {}", filename);

                return Base64.decodeBase64(attachPart.getData());
            }
        }
        return null;
    }

    /**
     * Creates an authorized Credential object.
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        // Load client secrets.
        InputStream in = GmailServiceImpl.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }
}
