import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationService {
    static async validateClass<T extends object>(classDTO: new () => T, objectToValidate: Record<string, any>): Promise<boolean> {
        try {
            const dtoInstance = plainToClass(classDTO, objectToValidate);

            const errors = await validate(dtoInstance);

            if (errors.length > 0) {
                const bigErrorMsg = errors.reduce((bigErr, err) => {
                    if (!err.constraints)
                        return bigErr;

                    return bigErr += `[${Object.values(err.constraints).reduce((acc, val) => acc += `${val}; `, '')}]\n`;
                }, '');

                throw Error(`[ValidationService - Validation Failed]:\n${bigErrorMsg}`);
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}