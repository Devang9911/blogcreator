import conf from "../conf/conf.js";
import { Client, ID, Storage, Query, TablesDB } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                rowId: slug
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            await this.databases.listRows({
                databaseId: conf.appwriteDatabaseID,
                tableId: conf.appwriteCollectionID,
                queries,
            })
        } catch (error) {
            console.log("Appwrite service :: getallPost :: error", error)
            return false;
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: fileId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketID,
            fileId: fileId,
        })
    }
}


const service = new Service()
export default service