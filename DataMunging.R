library(dplyr)
library(languageR)
library(data.table)

#read in data
ds_data <- read.csv(file = file.choose())
zip_data <- read.csv(file=file.choose())


#create a variable to join our data with geospatial data. best match is to use
#city state since zips arent reliable/missing
ds_data$citystate <- paste(ds_data$city,ds_data$state, sep = ",")
zip_data$citystate <- paste(zip_data$city_ascii,zip_data$state_id,sep = ",")

data_combined <- dplyr::left_join(ds_data,zip_data,"citystate")
data_combined <- select(data_combined,position,company,description,reviews,
                        city.x,state,lat,lng)

data_combined$position <- tolower(data_combined$position)
data_combined$position_cat <- as.factor(ifelse(data_combined$position %like% 'manager','Data Manager',
                                      ifelse(data_combined$position %like% 'analyst','Data Analyst',         
                                      ifelse(data_combined$position %like% 'director','Data Director',  
                                      ifelse(data_combined$position %like% 'consult','Data Consultant',        
                                      ifelse(data_combined$position %like% 'scien','Data Scientist',
                                      ifelse(data_combined$position %like% 'research','Research Analyst/Scientist',
                                      ifelse(data_combined$position %like% 'dev' | data_combined$position %like% 'program','Data Developer',
                                      ifelse(data_combined$position %like% 'tech','Data Technician',  
                                      
                                      ifelse(data_combined$position %like% 'engine','Data Engineer',
                                      ifelse(data_combined$position %like% 'intell' | data_combined$position %like% 'Business' ,'BI Analyst',
                                      ifelse(data_combined$position %like% 'assist','Data Assistant',
                                      ifelse(data_combined$position %like% 'full','Full Stack Engineer',
                                      ifelse(data_combined$position %like% 'machine','Machine Learning Engineer',
                                      ifelse(data_combined$position %like% 'admin','Data Admin',
                                      ifelse(data_combined$position %like% 'stat','Statistician','Other'))))))))))))))))
summary(data_combined$position_cat)
#write to csv
write.csv(data_combined,'data_jobs.csv')
