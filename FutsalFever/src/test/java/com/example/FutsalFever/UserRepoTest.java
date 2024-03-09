package com.example.FutsalFever;

import com.example.FutsalFever.config.PasswordEncoderUtil;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.UserPojo;
import com.example.FutsalFever.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.example.FutsalFever.service.impl.UserServiceImpl;
import java.util.Collections;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_NewUser_Success() {
        UserPojo userPojo = new UserPojo();
        userPojo.setFullName("Ram Shrestha");
        userPojo.setUserName("ramstha");
        userPojo.setPassword("password");
        userPojo.setAddress("Gatthaghar");
        userPojo.setEmail("ramshrestha@gmail.com");

        when(userRepository.getUserByEmail(anyString())).thenReturn(Optional.empty());

        userService.saveUser(userPojo);

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void saveUser_ExistingUser_ThrowException() {
        UserPojo userPojo = new UserPojo();
        userPojo.setEmail("ramshrestha@gmail.com");

        when(userRepository.getUserByEmail(anyString())).thenReturn(Optional.of(new User()));

        assertThrows(RuntimeException.class, () -> userService.saveUser(userPojo));
    }

    @Test
    void getAllData_ReturnAllUsers() {
        when(userRepository.findAll()).thenReturn(Collections.singletonList(new User()));

        assertEquals(1, userService.getAllData().size());
    }

    @Test
    void getByEmail_UserExists_ReturnUser() {
        User user = new User();
        user.setEmail("ramshrestha@gmail.com");
        when(userRepository.getUserByEmail("ramshrestha@gmail.com")).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getByEmail("ramshrestha@gmail.com");

        assertTrue(foundUser.isPresent());
        assertEquals("ramshrestha@gmail.com", foundUser.get().getEmail());
    }

    @Test
    void getByEmail_UserNotExists_ReturnEmpty() {
        when(userRepository.getUserByEmail(anyString())).thenReturn(Optional.empty());

        Optional<User> foundUser = userService.getByEmail("ramshrestha@gmail.com");

        assertFalse(foundUser.isPresent());
    }
}
