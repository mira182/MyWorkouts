package com.workouts.myworkouts.service.gmail;

import java.io.IOException;
import java.security.GeneralSecurityException;

public interface GmailService {

    byte[] getAttachmentFromMailByQuery() throws IOException, GeneralSecurityException;

    boolean doesNewTanitaEmailExist() throws IOException, GeneralSecurityException;

}
