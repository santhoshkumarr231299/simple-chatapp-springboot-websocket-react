package com.realstar.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.realstar.websocket.model.MessageModel;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MessageController {
    // @MessageMapping("/chat.register")
    // @SendTo("/topic/public")
    // public MessageModel register(@Payload MessageModel messageModel, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
    //     simpMessageHeaderAccessor.getSessionAttributes().put("username", messageModel.getSender());
    //     log.info(messageModel.toString());
    //     return messageModel;
    // }

    @MessageMapping("/chat")
    @SendTo("/topic/public")
    public MessageModel sendMessage(@Payload MessageModel messageModel) {
        log.info(messageModel.toString());
        return messageModel;
    }

}
