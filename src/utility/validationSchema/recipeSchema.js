import * as Yup from 'yup';

const recipeSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Too Short!')
        .max(96, 'Too Long!')
        .required('Please provide a title.'),
    description: Yup.string().required("Please provide a description."),
    prep: Yup.object({
        time: Yup.number().typeError("Please provide a number for prep time").required("Please provide a prep time"),
        unit: Yup.string().required("Required.")
    }),
    cook: Yup.object({
        time: Yup.number().typeError("Please provide a number for cook time").required("Please provide a cook time"),
        unit: Yup.string().required("Required.")
    }),
    ingredients: Yup.array().min(1, "Please provide the ingredients list."),
    instructions: Yup.array().min(1, "Please provide the instructions list").required("Please provide the instructions list."),
    comments: Yup.array(),
});

export default recipeSchema;