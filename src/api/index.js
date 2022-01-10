import request from '@/utils/request';

export function covdata() {
    return request({
        url: '/covidData',
        method: 'get'
    });
}

export function get_question() {
    return request({
        url: '/baseQuestion',
        method: 'get'
    });
}

export function get_child_question(id) {
    return request({
        url: '/nextQuestion/' + id,
        method: 'get'
    });
}

export function sub_answer(data) {
    const headers = { 'Content-Type': 'application/json' };
    return request.post('/createEva', {param:data}, { headers: headers });
}

export function goodsList() {
    return request({
        url: '/goodsList',
        method: 'get',
    });
}

export function goodsdetail(id) {
    // const headers = { 'Content-Type': 'multipart/form-data' };
    return request.post('/goodsDetails', {goods_id:id}, '');
}

export function subOrder(form) {
    // const headers = { 'Content-Type': 'multipart/form-data' };
    return request.post('/consultGoods', form, '');
}

export function getNews() {
    return request({
        url: '/news',
        method: 'get'
    });
}

export function getComment(param) {
    return request.post('/commentList', param, '');
}
export function thumbsUp(param) {
    return request.post('/thumbsUp', param, '');
}
export function thumbsDown(param) {
    return request.post('/thumbsDown', param, '');
}
export function delComment(param) {
    return request.post('/delComment', param, '');
}
export function Subcomment(param) {
    return request.post('/comment', param, '');
}

export function visitData() {
    return request({
        url: '/visitData',
        method: 'get'
    });
}
