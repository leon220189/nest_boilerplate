# from locust import HttpUser, task, between, tag

# class TaskUser1(HttpUser):
#     wait_time = between(1, 2)

#     @tag('task1')
#     @task
#     def task_1(self):
#         response = self.client.get("/v1")
#         if response.status_code != 200:
#             print(f"Task_1 Failed with status code: {response.status_code}")
#         else:
#             print(f"Task_1 Success: {response.text}")
