class EventRouter
  def initialize
    @outputs = []
  end

  def add_output(output)
    @outputs.push(output)
  end

  def send_event(event)
    @outputs.each do |output|
      output.execute(event)
    end
  end
end
