import { createCourse } from '../scripts/createCourse'
import { readCourse, readAllCourses, readFilteredCourses } from '../scripts/readCourse'
import { updateCourse, updateCourses } from '../scripts/updateCourse'
import { deleteCourse, deleteCourses } from '../scripts/deleteCourse'

exports.checkCreateCourse = function(req: any, res: any) {
  try {
    createCourse();
    res.send('新しいコースが作成されました！');
  } catch (e: any) {
    console.log(e.message);
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkReadCourse = function(req: any, res: any) {
  try {
    readCourse();
    readAllCourses();
    readFilteredCourses();
    res.send(
      '１件のコースを読み込みました！<br>全てのコースを読み込みました！<br>条件指定のコースを読み込みました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkUpdateCourse = function(req: any, res: any) {
  try {
    updateCourse();
    updateCourses();
    res.send(
      '１件のコースを更新しました！<br>複数のコースを更新しました！'
    );
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}

exports.checkDeleteCourse = function(req: any, res: any) {
  try {
    deleteCourse(9);
    deleteCourses(25, 28);
    res.send(
      '１件のコースを削除しました！<br>複数のコースを削除しました！'
    )
  } catch (e: any) {
    res.status(500).send('エラーが発生しました');
  }
}
