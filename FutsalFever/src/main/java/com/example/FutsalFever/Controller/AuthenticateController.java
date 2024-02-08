package com.example.FutsalFever.Controller;


import com.example.FutsalFever.pojo.AuthenticateRequest;
import com.example.FutsalFever.pojo.AuthenticateResponse;
import com.example.FutsalFever.service.AuthenticateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthenticateController {
    private final AuthenticateService authenticateService;

    @PostMapping("/login")
    public AuthenticateResponse authenticate(@RequestBody AuthenticateRequest authenticateRequest) {

        return authenticateService.authenticate(authenticateRequest);
    }

}
