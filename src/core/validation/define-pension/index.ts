import z from 'zod'

export const definePensionDataValidationSchema = z.object({
  surname: z
    .string()
    .min(2, {message: 'Фамилия должна быть больше 2х символов'}),

  name: z
    .string()
    .min(2, {message: 'Имя должно быть больше 2х символов'}),

  patronymic: z
    .string()
    .min(2, {message: 'Отчество должно быть больше 2х символов'}),

  gender: z
    .string(),

  age: z
    .number()
    .min(16, {message: 'Минимальный возраст 16'})
    .max(144, {message: 'Максимальный возраст 144'}),

  profession: z
    .string(),

  workExperience: z
    .number(),

  isInvalidity: z
    .boolean(),
  isLossOfBreadwinner: z
    .boolean(),

  invalidityGroup: z
    .optional(z.string()),

  invalidityAge: z
    .optional(
      z
        .number()
        .min(16, {message: 'Минимальный возраст 16'})
        .max(144, {message: 'Максимальный возраст 144'})
    ),

  invalidityCertificateText: z
    .optional(
      z
        .string()
        .min(50, 'Как минимум 50 символов!')
    ),

  breadwinnerSurname: z.optional(z
    .string()
    .min(2, {message: 'Фамилия должна быть больше 2х символов'})),

  breadwinnerName: z.optional(z.string().min(2, {message: 'Имя должно быть больше 2х символов'})),

  breadwinnerPatronymic: z.optional(z
    .string()
    .min(2, {message: 'Отчество должно быть больше 2х символов'})),

  breadwinnerGender: z
    .optional(z.string()),

  breadwinnerAge: z
    .optional(
      z
        .number()
        .min(16, {message: 'Минимальный возраст 16'})
        .max(144, {message: 'Максимальный возраст 144'})
    ),

  breadwinnerWorkExperience: z.optional(z.number()),

  breadwinnerCertificateText: z.optional(
    z
      .string()
      .min(50, 'Как минимум 50 символов!')
  )
})