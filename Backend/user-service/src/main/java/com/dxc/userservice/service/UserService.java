package com.dxc.userservice.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dxc.userservice.model.LoginRequest;
import com.dxc.userservice.model.RegistrationRequest;
import com.dxc.userservice.model.User;
import com.dxc.userservice.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	public ResponseEntity<String> addUser(RegistrationRequest request) {
		try {
			
			if (userRepository.existsByEmail(request.getEmail())) {
                return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);
            }
			
			String password = request.getPassword();
            String hashedPassword = hashPassword(password);
            
			var user = User.builder()
					.companyName(request.getCompanyName())
					.address(request.getAddress())
					.country(request.getCountry())
					.state(request.getState())
					.pinCode(request.getPincode())
					.repFirstName(request.getRepFirstName())
					.repLastName(request.getRepLastName())
					.email(request.getEmail())
					.password(hashedPassword)
					.build();
			userRepository.save(user);
			
			// Send confirmation email
            String subject = "Registration Confirmation";
            String body = 
            		"Dear " + user.getRepFirstName() + ",\n\nWe are delighted to inform you that your registration"
            				+ " as an accountant for "+ user.getCompanyName() + " has been successfully completed in"
            			    + " our Accounting System Application.\n\nThank you for choosing our services."
            			    + "\n\nBest regards,\nThe Accounting System Team";
            emailSenderService.sendConfirmationEmail(user.getEmail(), subject, body);
			
			return new ResponseEntity<>("User added successfully!", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("User registration unsuccessfull!", HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<String> login(LoginRequest request) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
            }

            User user = optionalUser.get();
            String hashedPassword = hashPassword(request.getPassword());
            if (!user.getPassword().equals(hashedPassword)) {
                return new ResponseEntity<>("Invalid credentials!", HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Login failed!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	private String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashedBytes = md.digest(password.getBytes());
        return Base64.getEncoder().encodeToString(hashedBytes);
    }

}
