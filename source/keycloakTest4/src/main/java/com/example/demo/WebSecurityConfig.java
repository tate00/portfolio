package com.example.demo;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.ajp.AjpNio2Protocol;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http,HandlerMappingIntrospector introspector) throws Exception {
		MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(introspector);	
		http
		.authorizeHttpRequests(request -> request
				.requestMatchers(mvcMatcherBuilder.pattern("/*")).hasAuthority("ROLE_USER")
				.anyRequest().permitAll()
		).saml2Login(saml2Login -> saml2Login
				 // SAML 2.0プロトコルの認証設定をカスタマイズする場合は、ここにCustomizerを指定します
				 .defaultSuccessUrl("/hello") // 認証成功後のデフォルトのリダイレクト先を設定する場合など)
		).saml2Metadata(
		    	Customizer.withDefaults()
	    ).csrf(
				// CSRFキー有効化設定（デフォルト：有効） 
	    		Customizer.withDefaults()
	    );
		http.csrf().disable();
		return http.build();
	}
	
    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> servletContainer() {
        Connector connector = new Connector("org.apache.coyote.ajp.AjpNio2Protocol");
        connector.setPort(8009);
        AjpNio2Protocol protocol = (AjpNio2Protocol) connector.getProtocolHandler();
        protocol.setSecretRequired(false);  // secretを使わない
        return factory -> factory.addAdditionalTomcatConnectors(connector);
    }
}
