###.Net backend part
--Execute the command *dotnet restore* to get all the dependencies needed (Entity framework core, xUnit etc ..)
--SQL Server must be installed on the machine
--Go to appsettings.json and change *DefaultConnection* to your connection string (might be different than the default one)
--Execute update-database in the package console manager to create the database and apply the migrations
--Execute the project in https mode in visual studio

###Angular frontend part:
--Previous steps are mandatory for the frontend (or you will get a popup with an error because there won't be nay data to display)
--All you need to do is to navigate to HahnFrontendProject/HahnFrontend and execute the command *npm install* to install all necessary packages (because of .gitignore)
--Simply execute *ng serve -o* after that to launch the project
