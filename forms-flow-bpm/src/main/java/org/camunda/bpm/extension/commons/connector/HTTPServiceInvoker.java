package org.camunda.bpm.extension.commons.connector;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.commons.lang3.StringUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.camunda.bpm.extension.commons.ro.req.IRequest;
import org.camunda.bpm.extension.commons.ro.res.IResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * This class prepares the payload and invokes the respective access handler based on the service ID.
 *
 * @author  sumathi.thirumani@aot-technologies.com
 */
@Component("httpServiceInvoker")
public class HTTPServiceInvoker {

    private final Logger LOGGER = Logger.getLogger(HTTPServiceInvoker.class.getName());

    @Autowired
    private AccessHandlerFactory accessHandlerFactory;
    @Resource(name = "bpmObjectMapper")
    private ObjectMapper bpmObjectMapper;
    @Autowired
    private Properties integrationCredentialProperties;

    public ResponseEntity<String> execute(String url, HttpMethod method, Object payload) throws IOException {
        String dataJson = payload != null ? bpmObjectMapper.writeValueAsString(payload) : null;
        return execute(url, method, dataJson);

    }

    public ResponseEntity<String> execute(String url, HttpMethod method, String payload) {
            return accessHandlerFactory.getService(getServiceId(url)).exchange(url, method, payload);
    }

    public ResponseEntity<IResponse> execute(String url, HttpMethod method, IRequest payload,
                                          Class<? extends IResponse> responseClazz) {
        return accessHandlerFactory.getService(getServiceId(url)).exchange(url, method, payload, responseClazz);
    }

    private String getServiceId(String url) {
        if(StringUtils.contains(url, getProperties().getProperty("api.url"))) {
            return "applicationAccessHandler";
        }
        return "formAccessHandler";
    }

    public Properties getProperties() {
        return integrationCredentialProperties;
    }

}