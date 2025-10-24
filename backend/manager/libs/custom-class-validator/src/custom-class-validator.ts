import {
  IsNumberOptions,
  ValidationOptions,
  ArrayMaxSize as _ArrayMaxSize,
  IsArray as _IsArray,
  ArrayNotEmpty as _ArrayNotEmpty,
  IsBoolean as _IsBoolean,
  IsDate as _IsDate,
  IsDateString as _IsDateString,
  IsIn as _IsIn,
  IsMongoId as _IsMongoId,
  IsNotEmpty as _IsNotEmpty,
  IsNumber as _IsNumber,
  IsUUID as _IsUUID,
  IsEmail as _IsEmail,
  IsObject as _IsObject,
  IsOptional as _IsOptional,
  IsString as _IsString,
  IsStrongPassword as _IsStrongPassword,
  Matches as _Matches,
  IsInt as _IsInt,
  Max as _Max,
  MaxLength as _MaxLength,
  Min as _Min,
  MinLength as _MinLength
} from 'class-validator';
import { IsISO8601Options } from 'validator';

export const IsMongoId = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsMongoId({
    ...validationOptions,
    message: 'El campo $property no tiene un formato adecuado'
  });

export const IsNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsNotEmpty({ ...validationOptions, message: 'El campo $property es requerido' });

export const IsOptional = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsOptional({ ...validationOptions, message: 'El campo $property es opcional' });

export const IsArray = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsArray({ ...validationOptions, message: 'El campo $property debe ser un arreglo' });

export const ArrayNotEmpty = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _ArrayNotEmpty({
    ...validationOptions,
    message: 'El campo $property no puede estar vacío'
  });

export const IsString = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsString({
    ...validationOptions,
    message: 'El campo $property debe ser una cadena de texto'
  });

export const IsEmail = (validationOptions?: ValidationOptions): PropertyDecorator =>
  function (object: Object, propertyName: string) {
    const _IsEmail = require('class-validator').IsEmail;
    _IsEmail({ ...validationOptions, message: 'El campo $property no tiene un formato de correo electrónico válido' })(object, propertyName);
  };

export const IsUUID = (version?: validator.UUIDVersion | undefined, validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsUUID(version, {
    ...validationOptions,
    message: 'El campo $property debe ser un UUID válido'
  });

export const IsNumber = (
  options?: IsNumberOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator =>
  _IsNumber(
    { ...options },
    { ...validationOptions, message: 'El campo $property debe ser un número' }
  );

export const IsBoolean = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsBoolean({
    ...validationOptions,
    message: 'El campo $property debe ser un booleano'
  });

export const IsDateString = (
  options?: IsISO8601Options,
  validationOptions?: ValidationOptions
): PropertyDecorator =>
  _IsDateString(
    { ...options },
    { ...validationOptions, message: 'El campo $property debe ser una fecha válida' }
  );

export const Matches = (
  pattern: RegExp,
  validationOptions?: ValidationOptions
): PropertyDecorator =>
  _Matches(pattern, {
    ...validationOptions,
    message: 'El campo $property contiene caracteres no permitidos'
  });

export const IsInt = (
  validationOptions?: ValidationOptions
): PropertyDecorator => _IsInt({
    ...validationOptions,
    message: 'El campo $property debe ser un número entero'
  });

export const Max = (maxValue: number, validationOptions?: ValidationOptions): PropertyDecorator =>
  _Max(maxValue, {
    ...validationOptions,
    message: 'El campo $property permite un valor máximo de $constraint1'
  });

export const Min = (minValue: number, validationOptions?: ValidationOptions): PropertyDecorator =>
  _Min(minValue, {
    ...validationOptions,
    message: 'El campo $property permite un valor mínimo de $constraint1'
  });

export const MaxLength = (max: number, validationOptions?: ValidationOptions): PropertyDecorator =>
  _MaxLength(max, {
    ...validationOptions,
    message:
      'El campo $property permite una longitud máxima de $constraint1 caracteres'
  });

export const MinLength = (min: number, validationOptions?: ValidationOptions): PropertyDecorator =>
  _MinLength(min, {
    ...validationOptions,
    message: 'El campo $property permite una longitud mínima de $constraint1 caracteres'
  });

export const IsIn = (
  values: readonly unknown[],
  validationOptions?: ValidationOptions
): PropertyDecorator =>
  _IsIn(values, {
    ...validationOptions,
    message: 'El campo $property debe ser de uno de los siguientes tipos $constraint1'
  });

export const IsDate = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsDate({ ...validationOptions, message: 'El campo $property debe ser una fecha válida' });

export const IsObject = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsObject({ ...validationOptions, message: 'El campo $property debe ser un objeto' });

export const IsStrongPassword = (validationOptions?: ValidationOptions): PropertyDecorator =>
  _IsStrongPassword({}, { ...validationOptions, message: 'Debes ingresar una contraseña segura' });

export const ArrayMaxSize = (
  size: number,
  validationOptions?: ValidationOptions
): PropertyDecorator =>
  _ArrayMaxSize(size, {
    ...validationOptions,
    message: `El campo $property no acepta mas de ${size} elementos`
  });
