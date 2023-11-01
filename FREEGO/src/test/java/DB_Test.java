import java.sql.*;

 

import sun.misc.*;

 

public class DB_Test {
 /**
  * @param args
  * @throws ClassNotFoundException 
  * @throws SQLException 
  */
	 public static void main(String[] args) throws ClassNotFoundException, SQLException {
	
	  String connectionUrl = "jdbc:sqlserver://192.168.0.20:1433;" + "databaseName=HSmart2;encrypt=false;";//
	       // Declare the JDBC objects.
	       Connection con = null;
	       Statement stmt = null;
	       ResultSet rs = null;
	
	       try {
	          // Establish the connection.
	          Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	          System.out.println("Driver okay");
	          con = DriverManager.getConnection(connectionUrl,"sa","#Hcnc.co.kr!");
	          System.out.println("Connection Made");
	       }
	       catch (Exception e) {
	          e.printStackTrace();
	       }
	 }

}
