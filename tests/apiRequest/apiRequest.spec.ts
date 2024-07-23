import { test, expect } from '@playwright/test'
import { VALID_DATA } from '../../src/utils/constants'
import { request } from '@playwright/test';
import { HomePage } from '../../src/page/HomePage';


test.describe('Verify API /cars', () => {
    let sid: string;

    test.beforeEach(async ({ request }) => {
        const authRequest = await request.post('api/auth/signin', {
            data: {
                "email": VALID_DATA.EMAIL,
                "password": VALID_DATA.PASSWORD,
                "remember": true
            }
        })

        const cookies = authRequest.headers()['set-cookies'];
        if (cookies!) {
            const cookiesArray = cookies.split('/n');
            for (let cooki of cookiesArray) {
                if (cooki.trim().startsWith('sid=')) {
                    sid = cooki.trim().split('=')[1].split(';')[0];
                    break;
                }
            }
        }
    })

    test('Post car', async ({ request }) => {
        const response = await request.post('/api/cars', {
            headers: {
                'Cookies': 'sid=${sid}',
            },
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 150
            }
        })
        expect(response.status).toBe(200);
    })

    test('Post Car - negative', async ({ request }) => {
        const response = await request.post('/api/cars', {
            headers: {
                'Cookies': 'sid=${sid}',
            },
            data: {

                "carBrandId": 105,
                "carModelId": 1,
                "mileage": 122
            }
        })
        expect(response.status).toBe(404);
        expect(response.body).toContain("Brand not found")
    })

    test('Post Car - negative - Car model id is required', async ({ request }) => {
        const response = await request.post('/api/cars', {
            headers: {
                'Cookies': 'sid=${sid}',
            },
            data: {

                "carBrandId": 1,
                "mileage": 122
            }
        })
        expect(response.status).toBe(400);
        expect(response.body).toContain("Car model id is required")
    })
})