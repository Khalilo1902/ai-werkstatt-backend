import AsyncHandler from "express-async-handler";
import Content from '../model/ContentSchema';
import { Response,Request } from "express";


// const createContent = AsyncHandler(async(req:Request,res:Response)=>{
//     try {
//         const {sectionTitle,description,features} = req.body
//         const newContent = await Content.create({
//             sectionTitle,
//             description,
//             features
//         })
//         await newContent.save()
//         res.status(201).json(newContent);

//     } catch (error) {
//         res.status(500).json({ message: error.message });

//     }
// })
const createContent = AsyncHandler(async (req: Request, res: Response) => {
    try {
      const { sectionTitle, description, features } = req.body;
      console.log("Received Data:", { sectionTitle, description, features }); // Debugging: Überprüfe die empfangenen Daten
      const newContent = await Content.create({
        sectionTitle,
        description,
        features,
      });
      await newContent.save();
      res.status(201).json(newContent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

   const getAllContent = AsyncHandler(async (req: Request, res: Response) => {
    try {
      const content = await Content.find();
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export {
    createContent,
    getAllContent
}