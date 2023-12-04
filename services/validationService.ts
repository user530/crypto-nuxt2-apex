import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationService {
    static async validateClass<T>(classDTO: new () => T, objectToValidate: Record<string, any>): Promise<boolean> {
        try {
            const dtoInstance = plainToClass(classDTO, objectToValidate);
            await validate(objectToValidate);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}