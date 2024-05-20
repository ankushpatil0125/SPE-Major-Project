package com.SPE.BookReview.Exceptions;


import com.SPE.BookReview.models.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.ZonedDateTime;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {APIRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(APIRequestException e)
    {
        String customMessage = e.getMessage();
        String originalMessage = e.getDetails();

        if (originalMessage != null) {
            ApiException apiException = new ApiException(customMessage, originalMessage,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
        }
        else {
            ApiException apiException = new ApiException(customMessage, null,HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
        }


//        ApiException apiException=new ApiException(e.getMessage(),e.getDetails(),HttpStatus.BAD_REQUEST);
//        return new ResponseEntity<>(apiException,HttpStatus.BAD_REQUEST);


    }
}
