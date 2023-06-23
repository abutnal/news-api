const logger = require('../utils/logger');
const sgMail = require('@sendgrid/mail')
const { v4 } = require('uuid');
const fetch = require('node-fetch');
const axios = require('axios');

global.__successfulLoginResponse = (req, res, data, message) => {
    try {
        let request = req.body || req.query;
        let method = req.method;
        let url = req.url
        logger.info({ url, method, message } || 'SUCCESS')
        let response = { data, message }
        let accessToken = data[0].accessToken;
        res.header('x-auth-token', accessToken).status(200).send(response);
    } catch (error) {
        res.header('x-auth-token', accessToken).status(400).send(error);
    }
};

global.__successResponse = (req, res, data, message) => {
    try {
        let postData = {}
        if (Object.keys(req.body).length !== 0) {
            postData = req.body;
        }
        if (Object.keys(req.query).length !== 0) {
            postData = req.query;
        }
        let request = postData;
        let method = req.method;
        let url = req.url
        if (method !== "GET") {
            logger.info({ url, method, request, response: data, message } || 'SUCCESS')
        }
        let status = true;
        let response = { status, message, data }
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(data)
    }
};
global.__badRequest = async (req, res, message) => {
    try {
        let postData = {}
        if (Object.keys(req.body).length !== 0) {
            postData = req.body;
        }
        if (Object.keys(req.query).length !== 0) {
            postData = req.query;
        }
        let request = postData;
        let method = req.method;
        let url = req.url
        logger.error({ url, method, request, message } || 'FAILD')
        let error = {
            errors: [
                {
                    msg: message,
                },
            ],
        };
        let status = false;
        let message = "Error"
        let response = { status, message, error }

        res.status(400).send(response)
    } catch (error) {
        res.status(400).send(message)
    }
};

global.__unauthorized = async (req, res, error) => {
    try {
        let postData = {}
        if (Object.keys(req.body).length !== 0) {
            postData = req.body;
        }
        if (Object.keys(req.query).length !== 0) {
            postData = req.query;
        }
        let request = postData;
        let method = req.method;
        let url = req.url
        logger.error({ url, method, request, error } || 'FAILD')
        let status = false;
        let message = "Internal Server Error"
        let response = { status, message, error }
        res.status(500).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
};

global.__validationError = async (req, res, error) => {
    try {
        let postData = {}
        if (Object.keys(req.body).length !== 0) {
            postData = req.body;
        }
        if (Object.keys(req.query).length !== 0) {
            postData = req.query;
        }
        let request = postData;
        let method = req.method;
        let url = req.url
        logger.error({ url, method, request, error } || 'FAILD')
        let status = false;
        let message = "Validation Error"
        let response = { status, message, error }
        res.status(401).send(response)
    } catch (error) {
        res.status(401).send(error)
    }
};




global.__DateTime = () => {
    try {
        let dt = new Date();
        dt.setHours(dt.getHours() + 5);
        dt.setMinutes(dt.getMinutes() + 30);
        return dt;

    } catch (error) {
        return error;
    }
};


