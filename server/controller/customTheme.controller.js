import customThemeModel from "../models/customTheme.model.js";

const customThemeController = {
    async getCustomTheme(req, res) {
        try {
            const customTheme = await customThemeModel.findById(req.params.id);
            res.status(200).json(customTheme);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    async createCustomTheme(req, res) {
        try {
            const isThemeAlreadyExist = await customThemeModel.findOne({
                companyName: req.body.companyName,
            });
            if (isThemeAlreadyExist) {
                await customThemeModel.findByIdAndUpdate(
                    {_id: isThemeAlreadyExist._id},
                    req.body,
                    {new: true}
                );
                res.status(200).json({message: "Theme Updated"});
                return;
            }
            const customTheme = await customThemeModel.create(req.body);
            res.status(201).json(customTheme);
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    },
    async getAll(req, res) {
        try {
            const customThemes = await customThemeModel.find();
            res.status(200).json(customThemes);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    async deletePreset(req, res) {
        try {
            const customTheme = await customThemeModel.findByIdAndDelete(
                req.params.id
            );
            res.status(200).json({message: "Theme Deleted"});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },
    async setNewOwner(req, res) {
        const {newOwner} = req.body
        const {id} = req.params
        try {
            const newDoc = await customThemeModel.findByIdAndUpdate(
                {_id: id},
                {owner: newOwner.toLowerCase()},
                {new: true}
            );
            res.status(200).json(newDoc);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
};
export default customThemeController;
