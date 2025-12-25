import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const newUser = await this.account.create({
            userId: ID.unique(),
            email,
            password,
            name
        });

        if (!newUser) return newUser;

        return this.login({ email, password });
    }

    async login({ email, password }) {
        return await this.account.createEmailPasswordSession({
            email,
            password
        });
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            return null;
        }
    }

    async logout() {
        return await this.account.deleteSessions();
    }
}

const authService = new AuthService();
export default authService;
