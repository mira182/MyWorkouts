package com.workouts.myworkouts.service.user;

import com.workouts.myworkouts.model.dto.user.UserDto;
import com.workouts.myworkouts.model.entity.user.Privilege;
import com.workouts.myworkouts.model.entity.user.Role;
import com.workouts.myworkouts.model.entity.user.User;
import com.workouts.myworkouts.model.mapper.UserMapper;
import com.workouts.myworkouts.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private final UserRepository userRepository;

	private final UserMapper userMapper;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Invalid username or password."));
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
	}

	private List<SimpleGrantedAuthority> getAuthority() {
		return Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public void delete(long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User findOne(String username) {
	    logger.info("Logging of user {}", username);
		return userRepository.findByUsername(username).orElseThrow(() ->
				new UsernameNotFoundException("User with username: " + username + " was not found"));
	}

	@Override
	public User findById(Long id) {
		return userRepository
				.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User with id = " + id + " not found."));
	}

	@Override
	public UserDto getUserDtoWithToken(String username) {
		final User user = userRepository.findByUsername(username).orElseThrow(() ->
				new UsernameNotFoundException("User with username: " + username + " was not found"));
		return userMapper.entityToDto(user);
	}

	@Override
	public void updateUser(long id, UserDto userDTO) {
		final User userEntity = userRepository.getOne(id);
        logger.debug("Updating user {} to new user {}", userEntity, userDTO);
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setFirstName(userDTO.getFirstName());
        userEntity.setLastName(userDTO.getLastName());
        userEntity.setUsername(userDTO.getUsername());
	}

	@Override
    public User saveOrUpdateUser(UserDto user) {
	    final User newUser = userRepository.findByUsername(user.getUsername()).orElseGet(User::new);
        logger.debug("Saving user {}", newUser);
        return userRepository.save(userMapper.dtoToEntity(user));
    }

	private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
		return getGrantedAuthorities(getPrivileges(roles));
	}

	private List<String> getPrivileges(Collection<Role> roles) {
		List<String> privileges = new ArrayList<>();
		List<Privilege> collection = new ArrayList<>();
		for (Role role : roles) {
			collection.addAll(role.getPrivileges());
		}
		for (Privilege item : collection) {
			privileges.add(item.getName());
		}
        logger.debug("Got privileges {}", privileges);
		return privileges;
	}

	private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		for (String privilege : privileges) {
			authorities.add(new SimpleGrantedAuthority(privilege));
		}
        logger.debug("Got authorities {}", authorities);
		return authorities;
	}
}
