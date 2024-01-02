
import {beforeAll, afterAll, expect} from '@jest/globals'
import {describe, it} from "node:test";
import {UserService} from "../../src/services/UserService";
import {AppDataSourceTest} from "../data-source";


let userService: UserService;

beforeAll(async () => {


})

afterAll(async  () => AppDataSourceTest.destroy())

describe("create user test", () => {
    it("should create a user", async ()=> {
        const user= {
            fullname: "slamet",
            username: "@slamet",
            password: "slamet123",
            email: "slamet@mail.com"
        }


        userService = new UserService(AppDataSourceTest)
        const response = await userService.create(user)

        expect(response).toMatchObject({
            data: {
                data: ""
            }
        })
    })
})

