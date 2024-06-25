from abc import ABC, abstractmethod

class Process(ABC):
  @abstractmethod
  def run(self):
    pass
