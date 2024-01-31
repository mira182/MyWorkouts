package com.workouts.myworkouts.service.image;

import com.workouts.myworkouts.exceptions.PictureStoringException;
import com.workouts.myworkouts.model.dto.picture.PictureDto;
import com.workouts.myworkouts.model.enums.PictureType;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;

import static com.workouts.myworkouts.config.Constants.EXERCISE_ICONS_LOCATION;
import static com.workouts.myworkouts.config.Constants.EXERCISE_IMAGES_LOCATION;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService  {

    private static final int ICON_MAX_WIDTH =  32;

    private static final int ICON_MAX_HEIGHT =  32;

    public ImageServiceImpl() throws IOException {
        Files.createDirectories(EXERCISE_IMAGES_LOCATION);
        Files.createDirectories(EXERCISE_ICONS_LOCATION);
    }

    @Override
    @Transactional
    public PictureDto storeImage(String exerciseName, MultipartFile file, PictureType type) {
        String fileName;
        String relativePath;

        try {
            switch (type) {
                case EXERCISE_IMAGE:
                    fileName = exerciseName + "." + FilenameUtils.getExtension(file.getOriginalFilename());
                    relativePath = EXERCISE_IMAGES_LOCATION.toString();
                    Files.copy(
                            file.getInputStream(),
                            EXERCISE_IMAGES_LOCATION.resolve(fileName),
                            REPLACE_EXISTING
                    );
                    break;
                case EXERCISE_ICON:
                    fileName = exerciseName + "_32x32." + FilenameUtils.getExtension(file.getOriginalFilename());
                    relativePath = EXERCISE_ICONS_LOCATION.toString();
                    Files.copy(
                            resizeAndStoreMultipartImage(file, ICON_MAX_WIDTH, ICON_MAX_HEIGHT),
                            EXERCISE_ICONS_LOCATION.resolve(fileName),
                            REPLACE_EXISTING
                    );
                    break;
                default:
                    throw new PictureStoringException(String.format("Couldn't store picture with type: %s for exercise name: %s", type, exerciseName));
            }
        } catch (Exception e) {
            throw new PictureStoringException(String.format("Couldn't store picture with type: %s for exercise name: %s", type, exerciseName), e);
        }

        return PictureDto.builder()
                .name(fileName)
                .relativePath(relativePath)
                .type(type)
                .build();
    }


    private ByteArrayInputStream resizeAndStoreMultipartImage(MultipartFile image, int width, int height) throws IOException {
        BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(image.getBytes()));
        Image resultingImage = originalImage.getScaledInstance(width, height, Image.SCALE_DEFAULT);
        BufferedImage outputImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        ImageIO.write(outputImage, "png", os);
        return new ByteArrayInputStream(os.toByteArray());
    }

}
