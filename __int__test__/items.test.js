const setupTestEnv = require("./setupTestEnv")

const app = setupTestEnv();

describe("Integration tests for CRUD operations connected to test postgres Db", ()=>{
    test("Should create an item via POST route", async () => {
        const item = {
            name: 'Test item 3',
            description: 'This is a test item',
            gross_amount: '20'
        }

        const response = await app.inject({
            method: "POST",
            url: "/v2/",
            payload: item
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(item)
    })

    test("Should get a all items", async () => {


        const response = await app.inject({
          method: "GET",
          url: "/v2/",
        });

        
        const item = {
            id: response.json()[0].id,
            name: 'Test Item',
            description: 'This is a test item',
            gross_amount: 20 
        }
    
        expect(response.statusCode).toBe(200);
        expect(response.json()[0]).toMatchObject(item)
    });

    test("Should get a single item", async () => {
        const response = await app.inject({
          method: "GET",
          url: "/v2/1",
        });
    
        expect(response.statusCode).toBe(200);
      });

    test("Should update an item", async () => {

        const item = {
            name: "Test Item",
            description: "This is a test item",
        };

        
        const response = await app.inject({
        method: "PUT",
        url: "/v2/1",
        payload: item,
        });
        
        
        expect(response.statusCode).toBe(200);
        
    });
        
        
    test("Should delete an item", async () => {
        const response = await app.inject({
            method: "DELETE",
            url: "/v2/1",
        });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("Item with id: 1 has been deleted");
    });
})