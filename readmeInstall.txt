1. Backend Installation
-----------------------
1. Configure database:
   - Open appsettings.json
   - Modify connection string:
     "DefaultConnection": "Server=YOUR_SERVER;Database=PrinterDB;User=YOUR_USER;Password=YOUR_PASSWORD;"

2. Apply database migrations:
   dotnet ef database update

3. Run the application:
   dotnet run
   (Server will start on https://localhost:5001)

2. Frontend Installation
-----------------------
1. Install dependencies:
   npm install

2. Start the application:
   npm start/ng serve --open
   (App will open in browser at http://localhost:4200)

3. First-Time Setup
------------------
1. Open the web interface:
   http://localhost:4200

2. Add your first printer:
   - Click "Printer Management"
   - Click "Add Printer"
   - Enter:
     * Printer Name: My Printer
     * IP Address: [Your Printer's IP]
   - Click "Save"

3. Test connection:
   - Go to "Print Documents"
   - Select your printer
   - Click "Print Test Page"

4. Troubleshooting
-----------------
Common issues:

1. Connection errors:
   - Verify printer is on same network
   - Check firewall allows port 9100

2. Database issues:
   - Verify SQL Server is running
   - Check connection string credentials

3. Frontend not loading:
   - Clear browser cache
   - Check console errors (F12)
------------------

This project is first complete web application built with Angular and ASP.NET Core. 
I know my GitHub journey had some bumps at the start, but now I have somethin to show you.
Yes, I'm aware of:
1 critical bug (currently being fixed)
A few minor issues (scheduled for next update)

This project represents countless hours of learning Angular through trial and error. The satisfaction of seeing it actually work makes all the debugging worth it!

Thank you for taking time to review my work :d