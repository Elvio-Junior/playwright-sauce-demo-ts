
import { test, expect } from '@playwright/test';
import { viaCepSchema } from '../../helpers/backend/viaCepSchema';
import { viaCepSchemaError } from '../../helpers/backend/viaCepSchemaError';
import { validateJson } from '../../util/jsonValidator';
import { ceps } from '../../helpers/backend/ceps';

test.describe('Suite Test Backend', () => {

    test('Should return a valid zip code', async ({ request }) => {
        const newRequest = await request.get(`https://viacep.com.br/ws/${ceps.cepValido}/json/`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest).toBeOK(); // Status code 200..299
        await expect(validateJson(await newRequest.json(), viaCepSchema)).toBe(true);
    });

    test('Should return a invalid zip code', async ({ request }) => {
        const newRequest = await request.get(`https://viacep.com.br/ws/${ceps.cepInvalido}/json/`);
        await expect(newRequest.ok()).toBeTruthy();
        await expect(newRequest).toBeOK(); // Status code 200..299
        await expect(validateJson(await newRequest.json(), viaCepSchemaError)).toBe(true);
    });
});