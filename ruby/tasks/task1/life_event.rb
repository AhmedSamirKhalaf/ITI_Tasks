class LifeEvent
  attr_accessor :type, :description, :duration, :time

  def initialize(type, description, duration)
    @type = type
    @description = description
    @duration = duration
    @time = Time.now
  end
end
