desc 'Run Rails server and React in development'
task start: :environment do
  puts "Starting development servers..."
  puts "Rails API: http://localhost:3000"
  puts "React Client: http://localhost:4000"
  puts ""
  
  # Ensure npm dependencies are installed
  puts "Installing npm dependencies..."
  unless system('cd client && npm install')
    puts "Error: Failed to install npm dependencies"
    exit 1
  end
  puts "npm dependencies installed successfully"
  puts ""
  
  # Unset NODE_OPTIONS to avoid conflicts with newer Node.js versions
  ENV.delete('NODE_OPTIONS')
  
  # Use foreman if available, otherwise fall back to heroku local
  if system('which foreman > /dev/null 2>&1')
    exec('foreman start -f Procfile.dev')
  elsif system('which heroku > /dev/null 2>&1')
    exec('heroku local -f Procfile.dev')
  else
    puts "Error: Neither 'foreman' nor 'heroku' CLI found."
    puts "Please install foreman: gem install foreman"
    puts "Or run servers manually:"
    puts "  Terminal 1: bundle exec rails s"
    puts "  Terminal 2: cd client && npm start"
    exit 1
  end
end

desc 'Run Rails server and React in development (alias for start)'
task server: :start
