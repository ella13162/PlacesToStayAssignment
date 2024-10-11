import { redirect } from "next/navigation";

export default function DashBoardPage({searchParams}){
  if(searchParams){
    if(searchParams.usertype === "User"){
      redirect("/dashboard/user");
    }else{
      redirect("/dashboard/admin");
    }
  }
  return (
    <div>Not a valid user</div>
  );
}
