<?php
header("Content-type:text/html;charset=UTF-8");
if (function_exists('mysql_connect')) {
	// echo 'Mysql扩展已经安装';
}
//连接数据库
//mysqli_connect($host, $user, $password, $database, $port, $socket);
if ($con = mysqli_connect("localhost", "root", "123456")) {
	//echo "连接成功";
	if (mysqli_select_db($con, 'web')) {
		mysqli_query($con, "set names 'utf8'");
		//echo "数据库连接成功";
		$username = isset($_POST['userName']) ? $_POST['userName'] : false;
		$password = isset($_POST['password']) ? $_POST['password'] : false;
		$sql_insert = "insert into user (email,password) values ('$username','$password')";
		$result = mysqli_query($con, $sql_insert);
//		if($result == true){
//			echo '成功';
//		}else{
//			echo '失败';
//		}
	} else {
		echo "数据库连接失败";
	}

} else {
	echo "连接失败";
}
?>
