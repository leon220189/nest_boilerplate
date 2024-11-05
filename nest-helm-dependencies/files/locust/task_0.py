# from locust import HttpUser, task, between, tag

# class TaskUser0(HttpUser):
#     wait_time = between(1, 2)

#     @tag('task0')
#     @task
#     def task_0(self):
#         response = self.client.get("/v1")
#         if response.status_code != 200:
#             print(f"Task_0 Failed with status code: {response.status_code}")
#         else:
#             print(f"Task_0 Success: {response.text}")
