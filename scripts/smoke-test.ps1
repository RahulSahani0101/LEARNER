param(
  [string]$ApiBase = "http://localhost:8080/api"
)

$ErrorActionPreference = "Stop"

function Invoke-Api {
  param(
    [string]$Method,
    [string]$Path,
    [hashtable]$Headers = @{},
    [string]$Body = ""
  )

  $params = @{
    Method = $Method
    Uri = "$ApiBase$Path"
    Headers = $Headers
  }

  if ($Body -ne "") {
    $params["ContentType"] = "application/json"
    $params["Body"] = $Body
  }

  return Invoke-RestMethod @params
}

try {
  $demoLogin = Invoke-Api -Method "Post" -Path "/auth/login" -Body '{"email":"demo@javadevmastery.com","password":"Password@123"}'
  $demoToken = $demoLogin.data.accessToken
  $demoHeaders = @{ Authorization = "Bearer $demoToken" }

  $topics = Invoke-Api -Method "Get" -Path "/topics" -Headers $demoHeaders
  $topicId = $topics.data[0].id
  $topicSlug = $topics.data[0].slug
  $null = Invoke-Api -Method "Get" -Path "/topics/$topicSlug" -Headers $demoHeaders
  $quiz = Invoke-Api -Method "Get" -Path "/quizzes/$topicId/questions" -Headers $demoHeaders
  $null = Invoke-Api -Method "Get" -Path "/dashboard" -Headers $demoHeaders

  $adminLogin = Invoke-Api -Method "Post" -Path "/auth/login" -Body '{"email":"admin@javadevmastery.com","password":"Password@123"}'
  $adminToken = $adminLogin.data.accessToken
  $adminHeaders = @{ Authorization = "Bearer $adminToken" }
  $adminOverview = Invoke-Api -Method "Get" -Path "/admin/overview" -Headers $adminHeaders

  [pscustomobject]@{
    status = "PASS"
    topics_count = $topics.data.Count
    quiz_questions = $quiz.data.Count
    admin_metrics = ($adminOverview.data.PSObject.Properties.Name -join ",")
  } | ConvertTo-Json -Compress
}
catch {
  [pscustomobject]@{
    status = "FAIL"
    error = $_.Exception.Message
  } | ConvertTo-Json -Compress
  exit 1
}
