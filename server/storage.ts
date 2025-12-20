import { type User, type InsertUser, type Conversation, type Message, type MessageReaction, type InsertMessage, type InsertReaction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getConversation(id: string): Promise<Conversation | undefined>;
  getConversationsByUser(userId: string): Promise<Conversation[]>;
  createConversation(participantIds: string[]): Promise<Conversation>;
  getMessages(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(messageId: string): Promise<void>;
  addReaction(reaction: InsertReaction): Promise<MessageReaction>;
  removeReaction(messageId: string, userId: string, emoji: string): Promise<void>;
  getMessageReactions(messageId: string): Promise<MessageReaction[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private conversations: Map<string, Conversation>;
  private messages: Map<string, Message>;
  private reactions: Map<string, MessageReaction>;

  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.reactions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async getConversationsByUser(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).filter((conv) =>
      conv.participantIds.includes(userId)
    );
  }

  async createConversation(participantIds: string[]): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      participantIds,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((msg) => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const newMessage: Message = {
      ...message,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    const message = this.messages.get(messageId);
    if (message) {
      this.messages.set(messageId, { ...message, isRead: true });
    }
  }

  async addReaction(reaction: InsertReaction): Promise<MessageReaction> {
    const id = randomUUID();
    const newReaction: MessageReaction = {
      ...reaction,
      id,
      createdAt: new Date(),
    };
    this.reactions.set(id, newReaction);
    return newReaction;
  }

  async removeReaction(messageId: string, userId: string, emoji: string): Promise<void> {
    const reactionId = Array.from(this.reactions.entries()).find(
      ([_, r]) => r.messageId === messageId && r.userId === userId && r.emoji === emoji
    )?.[0];
    if (reactionId) {
      this.reactions.delete(reactionId);
    }
  }

  async getMessageReactions(messageId: string): Promise<MessageReaction[]> {
    return Array.from(this.reactions.values()).filter(
      (r) => r.messageId === messageId
    );
  }
}

export const storage = new MemStorage();
