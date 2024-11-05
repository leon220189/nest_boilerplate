from locust import HttpUser, task, between

class CombinedUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def task_0(self):
        response = self.client.get("/v1")
        if response.status_code != 200:
            print(f"Task_0 Failed with status code: {response.status_code}")
        else:
            print(f"Task_0 Success: {response.text}")

    @task
    def task_1(self):
        response = self.client.get("/v1")
        if response.status_code != 200:
            print(f"Task_1 Failed with status code: {response.status_code}")
        else:
            print(f"Task_1 Success: {response.text}")
