import axios from "axios";
import AIRequest from "../model/AIRequest";
import dotenv from "dotenv";
dotenv.config();

const companyInfo = {
  name: "AI-Werkstatt",
  founded: "2023",
  phone: "+49 123 456 789",
  email: "kontakt@ai-werkstatt.de", // Beispiel-E-Mail
  address: "Musterstraße 123, 12345 Musterstadt",
  contactPage: "https://www.ai-werkstatt.de/kontakt", // Beispiel-URL zur Kontaktseite
  founders: [
    { name: "Khalil Haouas", role: "CEO" },
    { name: "Ghulam Karimi", role: "CTO" },
  ],
  pricing: {
    basic: "€50 pro Monat - Basis-Support und KI-Beratung",
    professional: "€150 pro Monat - Erweiterte KI-Lösungen und Prioritäts-Support",
    enterprise: "Preis auf Anfrage - Maßgeschneiderte Lösungen für Unternehmen",
  },
};

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt ist erforderlich" });
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const apiUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

    const enhancedPrompt = `Du bist ein freundlicher Assistent, der Informationen über AI-Werkstatt bereitstellt. Hier sind die Details:\n${JSON.stringify(companyInfo)}\n\nFrage: ${prompt}\nBeantworte die Frage präzise und in einem vollständigen Satz basierend auf den gegebenen Informationen. 
    - Wenn die Frage nach den Gründern geht (z. B. "Wer hat AI-Werkstatt gegründet?"), nenne beide Personen aus der "founders"-Liste: ${companyInfo.founders[0].name} und ${companyInfo.founders[1].name}.
    - Wenn die Frage nach Kontaktinformationen geht (z. B. "Wie kann ich euch kontaktieren?"), gib Telefonnummer (${companyInfo.phone}), E-Mail (${companyInfo.email}) und die Kontaktseite (${companyInfo.contactPage}) an.
    - Wenn die Frage nach Preisen geht (z. B. "Was sind eure Preise?"), nenne die Preisdetails aus "pricing".
    Antwort: `;

    const response = await axios.post(
      apiUrl,
      { inputs: enhancedPrompt, parameters: { max_length: 300, temperature: 0.7, top_p: 0.9, repetition_penalty: 1.1 } },
      { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
    );

    let aiResponse = response.data[0]?.generated_text || "Keine Antwort generiert";
    const answerPrefix = "Antwort: ";
    const answerIndex = aiResponse.indexOf(answerPrefix);
    if (answerIndex !== -1) {
      aiResponse = aiResponse.slice(answerIndex + answerPrefix.length).trim();
    } else if (aiResponse.startsWith(enhancedPrompt)) {
      aiResponse = aiResponse.slice(enhancedPrompt.length).trim();
    }

    const aiRequest = new AIRequest({ prompt, response: aiResponse });
    await aiRequest.save();

    return res.status(200).json({ prompt, response: aiResponse });
  } catch (error) {
    console.error("Fehler bei der AI-Anfrage:", error?.response?.data || error.message);
    return res.status(500).json({ message: "Serverfehler bei der AI-Anfrage" });
  }
};

const getGenerateText = async (req, res) => {
    try {
      // Alle gespeicherten Anfragen aus der Datenbank abrufen
      const requests = await AIRequest.find().sort({ createdAt: -1 }); // Sortiert nach Erstellungsdatum (neueste zuerst)
  
      if (!requests || requests.length === 0) {
        return res.status(404).json({ message: "Keine Anfragen gefunden" });
      }
  
      return res.status(200).json({ requests });
    } catch (error) {
      console.error("Fehler beim Abrufen der Anfragen:", error.message);
      return res.status(500).json({ message: "Serverfehler beim Abrufen der Anfragen" });
    }
  };
  
  export { generateText, getGenerateText };

