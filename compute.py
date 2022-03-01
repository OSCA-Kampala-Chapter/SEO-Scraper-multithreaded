import sys, json
from threading import Thread, Lock, current_thread
from queue import Queue

def read_in():
    lines = sys.stdin.readlines()
    return json.loads(lines[0])

def worker(q, lock):
    while True:
        value = q.get()
        with lock:
            print(f"processed... {value}")
        q.task_done()


if __name__ == '__main__':
    lock = Lock()
    q = Queue()
    num_threads = 10
    for i in range(num_threads):
        thread = Thread(target=worker, args=(q, lock))
        thread.daemon = True
        thread.start()

        for i, value in enumerate(read_in()):
            q.put(value)
            q.join()
            print("end main")