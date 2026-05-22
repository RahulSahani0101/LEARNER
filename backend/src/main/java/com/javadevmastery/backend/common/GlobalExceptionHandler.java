package com.javadevmastery.backend.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleApiException(ApiException exception) {
        Map<String, String> payload = new HashMap<>();
        payload.put("error", exception.getMessage());
        return ResponseEntity.status(exception.getStatus())
                .body(ApiResponse.fail(exception.getMessage(), payload));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> payload = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(fieldError -> payload.put(fieldError.getField(), fieldError.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.fail("Validation failed", payload));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleUnknownException(Exception exception) {
        Map<String, String> payload = new HashMap<>();
        payload.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail("Unexpected server error", payload));
    }
}
