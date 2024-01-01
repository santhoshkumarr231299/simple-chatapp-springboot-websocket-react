package com.realstar.websocket.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client")
public class ForwardController {
    @RequestMapping(value = {"", "/", "/{path:[^\\.]*}"})
    public String clientLoginPage() {
        return "forward:/";
    }
}
