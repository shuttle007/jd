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
		$username = isset($_POST['username']) ? $_POST['username'] : false;
		$password = isset($_POST['password']) ? $_POST['password'] : false;
		$sql = "select password from user where email='$username'";//123456
		//$sql1 = "select password from user where email='11111@qq.com'";//123456
		//$result = mysqli_query($con, $sql1);
	//	$rows = mysqli_num_rows($result);
		$query = mysqli_query($con, $sql);
			//fetch一下
			while($row = mysqli_fetch_row($query)){
//				print_r($row[0]);
				if($row[0] == $password){
					//header("Location:../../index.html");
					echo 1;
				}
			}
		//	$query1 = mysqli_query($con, $sql1);
//			if($query1 && mysqli_num_rows($query1)){
//				//进行数据的输出
//				while($row = mysqli_fetch_row($query1)){
//					print_r($row);
//				}
//			}
//		if($rows > 0){
//			if($rows[0] == $password){
//				echo 1;
//			}else{
//				echo 0;
//			}
//		}
	} else {
		echo "数据库连接失败";
	}

} else {
	echo "连接失败";
}
?>