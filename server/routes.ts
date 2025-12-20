import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/conversations/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const conversations = await storage.getConversationsByUser(userId);
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversations/:conversationId/messages", async (req, res) => {
    try {
      const { conversationId } = req.params;
      const messages = await storage.getMessages(conversationId);
      const messagesWithReactions = await Promise.all(
        messages.map(async (msg) => {
          const reactions = await storage.getMessageReactions(msg.id);
          return { ...msg, reactions };
        })
      );
      res.json(messagesWithReactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const validatedMessage = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedMessage);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.post("/api/messages/:messageId/reactions", async (req, res) => {
    try {
      const { messageId } = req.params;
      const { userId, emoji } = req.body;
      const reaction = await storage.addReaction({ messageId, userId, emoji });
      res.json(reaction);
    } catch (error) {
      res.status(400).json({ error: "Failed to add reaction" });
    }
  });

  app.delete("/api/messages/:messageId/reactions", async (req, res) => {
    try {
      const { messageId } = req.params;
      const { userId, emoji } = req.body;
      await storage.removeReaction(messageId, userId, emoji);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Failed to remove reaction" });
    }
  });

  app.post("/api/conversations", async (req, res) => {
    try {
      const { participantIds } = req.body;
      const conversation = await storage.createConversation(participantIds);
      res.json(conversation);
    } catch (error) {
      res.status(400).json({ error: "Failed to create conversation" });
    }
  });

  return httpServer;
}
