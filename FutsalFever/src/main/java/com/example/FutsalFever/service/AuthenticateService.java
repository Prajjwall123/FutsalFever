package com.example.FutsalFever.service;


import com.example.FutsalFever.pojo.AuthenticateRequest;
import com.example.FutsalFever.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
