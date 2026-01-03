const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe ('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin}

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')                
                .send(bodyLogin)
            
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
            
        })

        it('Deve retornar 400 quando parametros de login ausentes', async () => {
            const bodyLogin = { ...postLogin}
            bodyLogin.username = ''
            
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)            
            expect(resposta.status).to.equal(400);
        })

        it ('Deve retornar 401 quando as credenciais de login forem inválidas', async () => {
            const bodyLogin = {...postLogin}
            bodyLogin.username = 'Mara'
            bodyLogin.senha = '1234567'

            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)            
            expect(resposta.status).to.equal(401);
        })

        it('Deve retornar 405 ao utilizar método não permitido no endpoint de login', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/login') // método não permitido
                .set('Content-Type', 'application/json');

            expect(resposta.status).to.equal(405);
        })

    })

})