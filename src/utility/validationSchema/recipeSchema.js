import * as Yup from 'yup';

const recipeDuration = Yup.object({
    days: Yup.number(),
    hours: Yup.number(),
    minutes: Yup.number(),
});

const recipeSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Too Short!')
        .max(96, 'Too Long!')
        .required('Please provide a title.'),
    description: Yup.string().required("Please provide a description."),
    prepTime: recipeDuration, cookTime: recipeDuration, totalTime: recipeDuration,
    ingredients: Yup.array().min(1, "Please provide the ingredients list."),
    instructions: Yup.array().min(1, "Please provide the instructions list").required("Please provide the instructions list."),
    comments: Yup.array(),
});

export default recipeSchema;