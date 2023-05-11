## Specify the File Geodatabase workspace
gdb = "C:\\Users\\XXXXXXXX\\Documents\\ArcGIS\\Projects\\XXXX.gdb"

## Get a list of domains
desc = arcpy.Describe(gdb)
domains = desc.domains

## Loop over the list of domains
for domain in domains:
    ## Create an object that represents the name of the Excel file to be created
    table_name = domain + '.xlsx'
    ## Let the user know what is happening
    print('Exporting {0} domain to table {1}'.format(domain, table_name))
    ## Create an object that represents the full path of the Excel file to be created
    table_full_path = os.path.join(os.path.dirname(gdb), table_name)
    ## Create an in memory object for the DBF to temporarily store the domains (since this is the default file type)
    in_memory_dbf = "in_memory" + "\\" + domain + ".dbf"
    ## Export the domain to the temporary in memory table
    ## NOTE: Cannot use "description," that is longer than 10 characters
    arcpy.DomainToTable_management(gdb, domain, in_memory_dbf, 'field', 'desc', '#')
    ## Convert the in memory table to an Excel stored on disc
    arcpy.TableToExcel_conversion(in_memory_dbf, table_full_path)
    ## Clear the memory so ArcGIS doesn't pitch a fit
    arcpy.Delete_management("in_memory")
