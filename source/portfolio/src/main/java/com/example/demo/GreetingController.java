package com.example.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {
	//参照：https://qiita.com/omix222/items/a6bd8b896ec48a727cb4
	//公式：https://spring.io/guides/gs/messaging-stomp-websocket/
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(500); // simulated delay
        return new Greeting(HtmlUtils.htmlEscape(message.getName())
                + " : "
                + HtmlUtils.htmlEscape(message.getMessage()) );
    }
}
