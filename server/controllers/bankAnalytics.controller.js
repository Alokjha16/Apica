import BankAnalytics from "../models/bankAnalytics.model.js";

// Get bank analytics by email
export const getBankAnalytics = async (req, res) => {
  try {
    const { email } = req.params;

    const bank = await BankAnalytics.findOne({ email });

    if (!bank) {
      return res.status(404).json({ message: "Bank not found" });
    }

    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update bank analytics
export const upsertBankAnalytics = async (req, res) => {
  try {
    const { email } = req.body;

    const updatedBank = await BankAnalytics.findOneAndUpdate(
      { email },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
